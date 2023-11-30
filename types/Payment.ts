type Payment = PaymentDTO &
  CreatedAndUpdated & {
    id: number
    student: Student
    course: Course
  }

type PaymentDTO = {
  payment_method: string
  amount: number
  code: string
  EnrollmentId: number
}

type PaymentComponentState = BasicComponentState & {
  payments: Payment[]
}

type PaymentFormState = PaymentDTO &
  BasicComponentState & {
    enrollments: Enrollment[]
  }
export type { Payment, PaymentDTO, PaymentComponentState, PaymentFormState }
