type Course = CourseDTO &
  CreatedAndUpdated & {
    id: number;
    program: Program;
  };

type CourseDTO = {
  code: string;
  ProgramId: number;
  periodStart: string;
  periodEnd: string;
  price: number;
};

type CourseComponentState = BasicComponentState & {
  courses: Course[];
};

type CourseFormState = CourseDTO &
  BasicComponentState & {
    programs: Program[];
    program: Program | null;
  };

export type { Course, CourseDTO, CourseComponentState, CourseFormState };
