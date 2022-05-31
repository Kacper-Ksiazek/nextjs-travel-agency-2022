// Tools
import { prisma } from "@/prisma/db";
import { NotFound } from "@/utils/api/Errors";
import PrismaRequestBody from "./PrismaRequestBody";
// Types
import type { ReviewType } from "@prisma/client";
import type { URLQueriesConvertedIntoPrismaBody } from "@/@types/pages/api/BulkAPIsURLQueriesHandler";
import type { BulkReviewsType, PointsDistribution } from "@/@types/pages/api/ReviewsAPI";
import type { PrismaRequestBroker, ReviewFromQuery, FeedbackFromQuery, AggregateCallParams, AggregateCallResponse } from "../@types";

export default class DestinationBroker implements PrismaRequestBroker {
    public constructor(public type: BulkReviewsType, public id: string) {}

    public async ensureThatRecordIsApproved(): Promise<void> {
        const model = await prisma.destination.findFirst({
            where: {
                id: this.id,
                status: "APPROVED",
            },
        });
        if (!model) throw new NotFound();
    }

    public async callForReviews(convertedURLsQueries: URLQueriesConvertedIntoPrismaBody): Promise<ReviewFromQuery[]> {
        const { where, skip, take, orderBy, select } = new PrismaRequestBody().create(convertedURLsQueries);
        // In order to make working pagination, we have to use array.slice method,
        // becouse prisma's skip and take are working in not in the way described in prisma's docs
        if (skip !== undefined && take !== undefined) {
            const allReviews = await prisma.destinationReview.findMany({
                where: {
                    destinationId: this.id,
                    ...where,
                },
                select: { id: true },
            });
            const IDsOfReviewsOnCurrentPage: string[] = allReviews.slice(skip, skip + take).map((el) => el.id);
            return await prisma.destinationReview.findMany({
                where: {
                    id: {
                        in: IDsOfReviewsOnCurrentPage,
                    },
                },
                orderBy,
                select,
            });
        }
        return await prisma.destinationReview.findMany({
            where: {
                destinationId: this.id,
                ...where,
            },
            orderBy,
            select,
            skip,
            take,
        });
    }

    public async callForFeedback(idList: string[]): Promise<FeedbackFromQuery[]> {
        return (await prisma.destinationReviewLike.groupBy({
            by: ["reviewId", "feedback"],
            where: { reviewId: { in: idList } },
            _count: { _all: true },
        })) as unknown as FeedbackFromQuery[];
    }

    public async aggregateCall(params: AggregateCallParams): Promise<AggregateCallResponse> {
        const result = await prisma.destinationReview.aggregate({
            where: { destinationId: this.id },
            ...(params.count ? { _count: { _all: true } } : {}),
            ...(params.avgScore ? { _avg: { points: true } } : {}),
        });

        return {
            ...(result._count ? { count: result._count._all } : {}),
            ...(result._avg?.points ? { avgScore: Number(result._avg.points.toFixed(2)) } : {}),
        };
    }

    public async pointsDistribution(): Promise<PointsDistribution> {
        const result = await prisma.destinationReview.groupBy({
            by: ["type"],
            where: { destinationId: this.id },
            _count: {
                _all: true,
            },
        });
        return {
            MIXED: result.find((el) => el.type === "MIXED")?._count._all ?? 0,
            NEGATIVE: result.find((el) => el.type === "NEGATIVE")?._count._all ?? 0,
            POSITIVE: result.find((el) => el.type === "POSITIVE")?._count._all ?? 0,
        };
    }

    public async countRecordsWithSpecificTypeOnly(type: ReviewType): Promise<number> {
        const result = await prisma.destinationReview.count({
            where: {
                destinationId: this.id,
                type,
            },
        });
        return result;
    }

    public async getAuthenticatedUserReview(userId: string): Promise<ReviewFromQuery | null> {
        return await prisma.destinationReview.findFirst({
            where: { reviewerId: userId, destinationId: this.id },
            select: new PrismaRequestBody().getSelect(),
        });
    }

    public async getSpecifiedReview(reviewId: string): Promise<ReviewFromQuery | null> {
        return await prisma.destinationReview.findFirst({
            where: { id: reviewId, destinationId: this.id },
            select: new PrismaRequestBody().getSelect(),
        });
    }
}