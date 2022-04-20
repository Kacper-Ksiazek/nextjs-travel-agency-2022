// Tools
import { styled } from "@mui/system";
import { destinationPictureURL, landmarkPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
import type { MUIStyledCommonProps } from "@mui/system";
// Other Components
import Image from "next/Image";
// Styled Components
interface Props {
    inactive?: boolean;
}
const Wrapper = styled("div", {
    shouldForwardProp: (propname: string) => !["inactive"].includes(propname),
})<Props>(({ theme, ...props }) => ({
    width: "calc(33% - 10px)",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    borderRadius: "5px",
    ...(props.inactive
        ? {
              img: {
                  opacity: 0.8,
                  filter: "blur(5px)",
              },
          }
        : {
              cursor: "pointer",
              img: {
                  opacity: 0.9,
                  transition: "transform .3s ease-in-out, opacity .3s ease-in-out",
              },
              "&:hover": {
                  img: {
                      opacity: 1,
                      transform: "scale(1.1)",
                  },
              },
          }),
}));
interface SingleLandmarkProps extends MUIStyledCommonProps {
    inactive?: boolean;
    url: string;
}

const SingleLandmark: FunctionComponent<SingleLandmarkProps> = (props) => {
    const { url, ...propsToForward } = props;
    const src = props.inactive ? destinationPictureURL(url, "360p", "thumbnail") : landmarkPictureURL(url, "360p");
    return (
        <Wrapper {...propsToForward}>
            <Image
                layout="fill" //
                alt="bg"
                objectFit="cover"
                objectPosition="center"
                src={src}
            ></Image>
        </Wrapper>
    );
};

export default SingleLandmark;