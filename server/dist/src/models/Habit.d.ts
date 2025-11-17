import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    habitName: string;
    frequency: number;
    time: string;
    userId: mongoose.Types.ObjectId;
    startDate: NativeDate;
    tag: ("Studies" | "Health" | "Hobby" | "spirituality" | "Other")[];
    description?: string | null;
    endDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    habitName: string;
    frequency: number;
    time: string;
    userId: mongoose.Types.ObjectId;
    startDate: NativeDate;
    tag: ("Studies" | "Health" | "Hobby" | "spirituality" | "Other")[];
    description?: string | null;
    endDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    habitName: string;
    frequency: number;
    time: string;
    userId: mongoose.Types.ObjectId;
    startDate: NativeDate;
    tag: ("Studies" | "Health" | "Hobby" | "spirituality" | "Other")[];
    description?: string | null;
    endDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    habitName: string;
    frequency: number;
    time: string;
    userId: mongoose.Types.ObjectId;
    startDate: NativeDate;
    tag: ("Studies" | "Health" | "Hobby" | "spirituality" | "Other")[];
    description?: string | null;
    endDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    habitName: string;
    frequency: number;
    time: string;
    userId: mongoose.Types.ObjectId;
    startDate: NativeDate;
    tag: ("Studies" | "Health" | "Hobby" | "spirituality" | "Other")[];
    description?: string | null;
    endDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    habitName: string;
    frequency: number;
    time: string;
    userId: mongoose.Types.ObjectId;
    startDate: NativeDate;
    tag: ("Studies" | "Health" | "Hobby" | "spirituality" | "Other")[];
    description?: string | null;
    endDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Habit.d.ts.map