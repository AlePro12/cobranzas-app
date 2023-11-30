type BackendAPI = {
  studentAPI: StudentAPI
  programAPI: ProgramAPI
  courseAPI: CourseAPI
  enrollmentAPI: EnrollmentAPI
  paymentAPI: PaymentAPI
}

type StudentAPI = {
  getStudents: () => Promise<Student[]>
  createStudent: (estudentDTO: StudentDTO) => Promise<Student>
  updateStudent: (estudentDTO: StudentDTO, id: number) => Promise<[number]>
  deleteStudent: (id: number) => Promise<number>
}

type ProgramAPI = {
  getPrograms: () => Promise<Program[]>
  createProgram: (programDTO: ProgramDTO) => Promise<Program>
  updateProgram: (programDTO: ProgramDTO, id: number) => Promise<[number]>
  deleteProgram: (id: number) => Promise<number>
}

type CourseAPI = {
  getCourses: () => Promise<Course[]>
  createCourse: (courseDTO: CourseDTO) => Promise<Course>
  updateCourse: (courseDTO: CourseDTO, id: number) => Promise<[number]>
  deleteCourse: (id: number) => Promise<number>
}

type EnrollmentAPI = {
  getEnrollments: () => Promise<Enrollment[]>
  createEnrollment: (enrollmentDTO: EnrollmentDTO) => Promise<EnrollmentDTO>
  updateEnrollment: (enrollmentDTO: EnrollmentDTO, id: number) => Promise<[number]>
  deleteEnrollment: (id: number) => Promise<number>
}

type PaymentAPI = {
  getPayments: () => Promise<Payment[]>
  createPayment: (paymentDTO: PaymentDTO) => Promise<Payment>
  updatePayment: (paymentDTO: PaymentDTO, id: number) => Promise<[number]>
  deletePayment: (id: number) => Promise<number>
}

