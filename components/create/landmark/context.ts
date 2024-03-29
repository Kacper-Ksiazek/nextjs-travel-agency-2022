// Tools
import { createContext } from "react";
// Types
import type { LandmarkType } from "@prisma/client";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { Destination } from "@/@types/pages/create/CreateLandmark";

interface CreateLandmarkContext {
    /** New landmark's title */
    title: StatedDataField<string>;
    /** New landmark's type */
    landmarkType: StatedDataField<LandmarkType>;
    /** New landmark's thumbnail */
    thumbnail: StatedDataField<File | null>;
    /** New landmark's short description */
    shortDescription: StatedDataField<string>;
    /** dynamically generated by `Reader.readAsDataURL` url of selected thumbnail */
    thumbnailURL: StatedDataField<string | null>;
    /** Object containing information about selected in stage 1 destination*/
    selectedDestination: StatedDataField<Destination | null>;
}

export const CreateLandmarkContext = createContext<CreateLandmarkContext>({} as any);
