import { FieldConfig } from "@/config/loginFields"

export const sliderFields: FieldConfig[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter title",
    required: true
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter description",
    required: true
  },
  {
    name: "highlight_text",
    label: "Highlight",
    type: "text",
    placeholder: "Enter Highlight",
    required: true
  },
   {
    name: "button_text",
    label: "Button Text",
    type: "text",
    placeholder: "Enter Highlight",
    required: true
  },
  {
    name: "image_url",
    label: "Image URL",
    type: "file",
    placeholder: "Enter image url",
    required: true
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    placeholder: "Enter price",
    required: true
  }
]