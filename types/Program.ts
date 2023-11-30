
type Program = ProgramDTO &
  CreatedAndUpdated & {
    id: number
  }

type ProgramDTO = {
  name: string
  code: string
  description: string
}

type ProgramComponentState = BasicComponentState & {
  programs: Program[]
}

type ProgramFormState = ProgramDTO
