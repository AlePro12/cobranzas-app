type Student = StudentDTO &
  CreatedAndUpdated & {
    id: number
  }

type StudentDTO = {
  cedula: string
  name: string
  surname: string
  phone1: string
  phone2: string | null
  email: string
  birthdate: Date
}

type StudentComponentState = BasicComponentState & {
  students: Student[]
}

type StudentFormState = StudentDTO

export type { Student, StudentDTO, StudentComponentState, StudentFormState }
