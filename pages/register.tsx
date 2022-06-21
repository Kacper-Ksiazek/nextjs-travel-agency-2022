// Tools
import { useState } from "react";
import stated from "@/utils/client/stated";
import GuardedRoute from "@/utils/client/GuardedRoute";
import { RegisterContext } from "@/components/register/context";
import useFormFieldsWithValidation from "@/components/register/hooks/useFormFieldsWithValidation";
// Types
import type { GetServerSideProps, NextPage } from "next";
import type { Stage } from "@/components/register/@types";
// Other components
import Stage1 from "@/components/register/stage_1";
import Stage2 from "@/components/register/stage_2";
import Stage3 from "@/components/register/stage_3";
import StageHeader from "@/components/create/_utils/StageHeader";
import ContinueButton from "@/components/register/ContinueButton";
// Styled components
import MainWrapper from "@/components/register/stage_1/styled_components/MainWrapper";

const Registration: NextPage = () => {
    const [stage, setStage] = useState<Stage>("RESULT");
    const { data, checkWhetherAFieldIsInvalid, allFieldsAreValid } = useFormFieldsWithValidation();

    return (
        <RegisterContext.Provider
            value={{
                ...data,
                checkWhetherAFieldIsInvalid,
            }}
        >
            <MainWrapper>
                <StageHeader title="Create an account" stageNumber={1} alternateBackgroundText="Register" />
                <div className="content-wrapper">
                    {(() => {
                        switch (stage) {
                            case "PERSONAL_DATA":
                                return <Stage1 />;
                            case "CONFIRMATION":
                                return <Stage2 />;
                            case "RESULT":
                                return <Stage3 />;
                        }
                    })()}
                </div>
                <ContinueButton
                    allFieldsAreValid={allFieldsAreValid} //
                    stage={stated(stage, setStage)}
                />
            </MainWrapper>
        </RegisterContext.Provider>
    );
};
export const getServerSideProps: GetServerSideProps = (ctx) => GuardedRoute("anonymous", ctx);

export default Registration;
