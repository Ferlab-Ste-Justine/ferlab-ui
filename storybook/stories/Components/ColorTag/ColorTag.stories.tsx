import ColorTag, {
    ColorTagType
} from "@ferlab/ui/core/components/ColorTag";
import { Meta } from "@storybook/react";
import React from "react";

export default {
    title: "@ferlab/Components/ColorTag",
    component: ColorTag,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

export const ColorTagBooleanStory = () => (
    <>
        <h3>ColorTag Boolean Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ColorTag type={ColorTagType.Boolean} value="true" />
            <ColorTag type={ColorTagType.Boolean} value="true">True alternate text</ColorTag>
            <ColorTag type={ColorTagType.Boolean} value="false" />
            <ColorTag type={ColorTagType.Boolean} value="default" />
            <ColorTag type={ColorTagType.Boolean} value="other value">A other value</ColorTag>
        </div>
    </>
);

export const ColorTagGenderStory = () => (
    <>
        <h3>ColorTag Gender Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ColorTag type={ColorTagType.Gender} value="female" />
            <ColorTag type={ColorTagType.Gender} value="female">Female alternate text</ColorTag>
            <ColorTag type={ColorTagType.Gender} value="male" />
            <ColorTag type={ColorTagType.Gender} value="male">Male alternate text</ColorTag>
            <ColorTag type={ColorTagType.Gender} value="other" />
        </div>
    </>
);

export const ColorTagTumorType = () => (
    <>
        <h3>ColorTag Tumor Type Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ColorTag type={ColorTagType.TumorType} value="normal" />
            <ColorTag type={ColorTagType.TumorType} value="tumor" />
            <ColorTag type={ColorTagType.TumorType} value="tumor">tumor alternate text</ColorTag>
            <ColorTag type={ColorTagType.TumorType} value="other" />
        </div>
    </>
);


export const ColorTagFamilyStory = () => (
    <>
        <h3>ColorTag Family Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ColorTag type={ColorTagType.Family} value="solo" />
            <ColorTag type={ColorTagType.Family} value="trio" />
            <ColorTag type={ColorTagType.Family} value="duo" />
            <ColorTag type={ColorTagType.Family} value="other" />
        </div>
    </>
);

export const ColorTagPositionStory = () => (
    <>
        <h3>ColorTag Position Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ColorTag type={ColorTagType.Position} value="proband" />
            <ColorTag type={ColorTagType.Position} value="proband">Proband alternate text</ColorTag>
            <ColorTag type={ColorTagType.Position} value="other" />
        </div>
    </>
);

export const ColorTagVitalStatusStory = () => (
    <>
        <h3>ColorTag Vital Status Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ColorTag type={ColorTagType.VitalStatus} value="alive" />
            <ColorTag type={ColorTagType.VitalStatus} value="alive" >Alive alternate text</ColorTag>
            <ColorTag type={ColorTagType.VitalStatus} value="deceased" />
            <ColorTag type={ColorTagType.VitalStatus} value="deceased">Deceased alternate text</ColorTag>
            <ColorTag type={ColorTagType.VitalStatus} value="other" />
        </div>
    </>
);

export const ColorTagInterpretationStory = () => (
    <>
        <h3>ColorTag Interpretation Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ColorTag type={ColorTagType.Interpretation} value="observed" />
            <ColorTag type={ColorTagType.Interpretation} value="observed" >Observed alternate text</ColorTag>
            <ColorTag type={ColorTagType.Interpretation} value="other" />
        </div>
    </>
);

export const ColorTagPathogenicStory = () => (
    <>
        <h3>ColorTag Pathogenic Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ColorTag type={ColorTagType.Pathogenic} value="pathogenic" />
            <ColorTag type={ColorTagType.Pathogenic} value="pathogenic">Pathogenic alternate text</ColorTag>
            <ColorTag type={ColorTagType.Pathogenic} value="other" />
        </div>
    </>
);

export const ColorTagBenignStory = () => (
    <>
        <h3>ColorTag Benign Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ColorTag type={ColorTagType.Benign} value="benign" />
            <ColorTag type={ColorTagType.Benign} value="benign" >benign alternate text</ColorTag>
            <ColorTag type={ColorTagType.Benign} value="other" />
        </div>
    </>
);

export const ColorTagOtherStory = () => (
    <>
        <h3>ColorTag Other Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ColorTag type={ColorTagType.Other} value="other" />
            <ColorTag type={ColorTagType.Other} value="other">Other alternate text</ColorTag>
        </div>
    </>
);