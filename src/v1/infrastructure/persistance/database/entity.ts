import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('projects')
export class Project {
  @PrimaryColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  created_at!: string
}

@Entity('users')
export class User {
  @PrimaryColumn()
  id!: number

  @Column()
  first_name!: string

  @Column()
  last_name!: string

  @Column()
  created_at!: string
}

@Entity('projects_members')
export class ProjectMember {
  @PrimaryColumn()
  project_id!: number

  @PrimaryColumn()
  user_id!: number

  @Column()
  created_at!: string
}
