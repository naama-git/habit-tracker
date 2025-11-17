import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    habitId: mongoose.Types.ObjectId;
    done: boolean;
    logDate: NativeDate;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    habitId: mongoose.Types.ObjectId;
    done: boolean;
    logDate: NativeDate;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    habitId: mongoose.Types.ObjectId;
    done: boolean;
    logDate: NativeDate;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    habitId: mongoose.Types.ObjectId;
    done: boolean;
    logDate: NativeDate;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    habitId: mongoose.Types.ObjectId;
    done: boolean;
    logDate: NativeDate;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    habitId: mongoose.Types.ObjectId;
    done: boolean;
    logDate: NativeDate;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=HabitLog.d.ts.map