import type { ReviewType } from "@prisma/client";
import type { LandmarkReview, User } from "@prisma/client";
import type { Landmark as _Landmark, Destination as _Destination } from "@prisma/client";
import type { DescriptionContentField } from "@/@types/Description";

export interface DataFromAPI {
    landmark: Landmark;
    reviews: Review[];
    additionalLandmarks: AdditionalLandmark[];
    reviewsInTotal: number;
    averageReview: number;
}

export interface SimpleReview {
    id: LandmarkReview["id"];
    review: LandmarkReview["review"];
    points: LandmarkReview["points"];
    tags: string[];
    createdAt: string;
    type: ReviewType;
}

export interface Review extends SimpleReview {
    reviewer: {
        id: User["id"];
        name: User["name"];
        surname: User["surname"];
        country: User["country"];
        countryCode: User["countryCode"];
        gender: User["gender"];
        avatar: User["avatar"];
        age: number; //
    };
    feedback: {
        likes: number;
        dislikes: number;
    };
}

export interface Destination {
    city: _Destination["city"];
    country: _Destination["country"];
    continent: _Destination["continent"];
    shortDescription: _Destination["shortDescription"];
    folder: _Destination["folder"];
    slug: _Destination["slug"];
}

export interface Landmark {
    id: _Landmark["id"];
    slug: _Landmark["slug"];
    title: _Landmark["title"];
    folder: _Landmark["folder"];
    type: _Landmark["type"];
    shortDescription: _Landmark["shortDescription"];
    description: DescriptionContentField[];
    destination: Destination;
}

export interface AdditionalLandmark {
    id: _Landmark["id"];
    slug: _Landmark["slug"];
    title: _Landmark["title"];
    folder: _Landmark["folder"];
    type: _Landmark["type"];
    shortDescription: _Landmark["shortDescription"];
    destination: {
        city: _Destination["city"];
        country: _Destination["country"];
        continent: _Destination["continent"];
        slug: _Destination["slug"];
    };
}