import notes from "./readme.md";
import iconPaths from "./../cc-icon/selection";
import { withKnobs } from "@storybook/addon-knobs/html";

export default {title: "Breadcrumb", decoratos: [withKnobs]};

export const BreadCrumb = () => {
    const label = "Bread"

    const styledIcon = "0 4px;"

    return `
        <div class="p-lg">
            <h1 class="heading-01">Breadcrumb</h1>
            <section class="py-xlg color-primary font-black">
                <h2 class="text-subheading-02 mb-lg font-regular">Anatomy</h1>
                <div class="flex items-center">
                    <a href="#" class="text-small-02 font-regular">Opción 1</a>
                    <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
                    <a href="#" class="text-small-02 font-regular">Opción 2</a>
                    <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
                    <a href="#" class="text-small-02 font-regular">Opción 3</a>
                    <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
                    <span class="text-small-02 font-black">Opción 4</span>
                </div>
            </section>

            <section class="py-xlg color-primary font-black">
                <h2 class="text-subheading-02 mb-lg font-regular">Skeleton</h1>
                <a href="#" class="text-small-02">Opción 1</a> > 
                <a href="#" class="text-small-02">Opción 2</a> > 
                <a href="#" class="text-small-02">Opción 3</a> > 
                <span class="text-small-02">Opción 4</span>
            </section>

            <section class="py-xlg color-primary font-black">
                <h2 class="text-subheading-02 mb-lg font-regular">States</h1>
                <a href="#" class="text-small-02">Opción 1</a> > 
                <a href="#" class="text-small-02">Opción 2</a> > 
                <a href="#" class="text-small-02">Opción 3</a> > 
                <span class="text-small-02">Opción 4</span>
            </section>

            <section class="py-xlg color-primary font-black">
                <h2 class="text-subheading-02 mb-lg font-regular">Other behaviors</h1>
                <a href="#" class="text-small-02">Opción 1</a> > 
                <a href="#" class="text-small-02">Opción 2</a> > 
                <a href="#" class="text-small-02">Opción 3</a> > 
                <span class="text-small-02">Opción 4</span>
            </section>
            
        </div>
    `
}

BreadCrumb.story = {
    parameters: {
        notes
    }
}