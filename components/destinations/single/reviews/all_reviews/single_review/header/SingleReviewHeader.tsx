// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/SingleDestination";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import ReviewerAvatar from "./ReviewerAvatar";
import Score from "./Score";
import Date from "./Date";
import Flag from "./Flag";
// Styled component
import FlexBox from "@/components/_utils/styled/FlexBox";

const Name = styled(Box)(({ theme }) => ({
    fontSize: "2rem",
    fontWeight: "700",
    margin: "0 10px 0 0 ",
}));
const Age = styled(Box)(({ theme }) => ({
    fontSize: "1.2rem",
    paddingBottom: "5px",
}));

interface SingleReviewHeaderProps {
    review: Review;
}

const SingleReviewHeader: FunctionComponent<SingleReviewHeaderProps> = (props) => {
    const { review } = props;
    const { reviewer } = review;
    const fullName = `${reviewer.name} ${reviewer.surname},`;

    return (
        <FlexBox vertical="between" sx={{ position: "relative" }}>
            <Flag countryCode={reviewer.countryCode} country={reviewer.country}></Flag>

            <Score points={review.points}></Score>
            <ReviewerAvatar avatar={reviewer.avatar}></ReviewerAvatar>

            <FlexBox column vertical="evenly">
                <Date createdAt={props.review.createdAt}></Date>

                <FlexBox vertical="end">
                    <Name component="h4">{fullName}</Name>
                    <Age component="span">{`${reviewer.birth} years old`}</Age>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    );
};

export default SingleReviewHeader;
