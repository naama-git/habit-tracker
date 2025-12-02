
//---- This file is responsible for arrays for the view of Add Habit form

export interface FormField {
    name: string;
    label: string;
    type: string
    required?: boolean;
}

//---- fields for view
export const formFields: FormField[] = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "dates", label: "Start date & End Date", type: "date" },
    { name: "hour", label: "Hour", type: "time", required: true },
    { name: "freq", label: "Frequency", type: "number", required: true },
    { name: "tag", label: "Tag", type: "select" }
];

//----- An array of default tags
export const tags = [
    { value: 'Studies' },
    { value: 'Health' },
    { value: 'Hobby' },
    { value: 'Spirituality' },
    { value: 'Sport' },
    { value: 'Home' },
    { value: 'Business' },
    { value: 'Music' },
    { value: 'Homework' },
    { value: 'Other' }]

export const tags1:string[] = ['Studies','Health' ,'Hobby', "Spirituality", 'Sport', 'Home', 'Business', 'Music', 'Homework', 'Other']