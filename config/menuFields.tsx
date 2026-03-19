import { FieldConfig } from "./loginFields";

export const menuFields: FieldConfig[] = [
  {
    name: "name",
    label: "Item Name",
    type: "text",
    placeholder: "Enter item name",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter description",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    placeholder: "Enter price",
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      {
        value: "pasta",
        label: "Pasta",
      },
      {
        value: "rice",
        label: "Rice",
      },
      {
        value: "dessert",
        label: "Dessert",
      },
      {
        value: "drinks",
        label: "Drinks",
      },
    ],
  },
  {
    name: "image_url",
    label: "Upload Image",
    type: "file",
  },
];
