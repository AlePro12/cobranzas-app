
type Enrollment = EnrollmentDTO &
  CreatedAndUpdated & {
    id: number
    course: Course
    student: Student
  }

  type EnrollmentDTO = {
    CourseId: number
    StudentId: number
    paid: number
}

type EnrollmentComponentState = BasicComponentState & {
  enrollments: Enrollment[]
}

type EnrollmentFormState = EnrollmentDTO & BasicComponentState & {
  courses: Course[]
  students: Student[]
}
