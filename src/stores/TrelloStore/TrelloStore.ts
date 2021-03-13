import { makeAutoObservable } from "mobx";
import { v4 } from 'uuid'

export class TrelloStore {
  boards: Board[] = []
  tasks: Task[] = []

  constructor() {
    this.hydrate()

    makeAutoObservable(this)

    this.initial()
  }

  initial() {
    if (this.boards.length === 0) {
      this.addBoard({ title: 'A' })
      this.addBoard({ title: 'B' })
      this.addBoard({ title: 'C' })
      this.addBoard({ title: 'D' })
    }
  }

  addTask({
    title,
    boardId
  }: {
    title: Task['title']
    boardId: Task['boardId']
  }) {
    this.tasks.push({
      id: v4(),
      title,
      boardId,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  }

  addBoard({
    title
  }: {
    title: Board['title']
  }) {
    this.boards.push({
      id: v4(),
      title,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  }

  removeTask({
    id
  }: {
    id: Task['id']
  }) {
    const targetTask = this.findTask(id)
    const hasTargetTask = targetTask !== undefined

    if (targetTask !== undefined) {
      targetTask.isDeleted = true
    } else {
      console.log(`${id}에 해당하는 태스크 찾을 수 없음`)
    }

    return hasTargetTask
  }

  changeTask(id: Task['id'], newTask: Partial<Task>) {
    const originTask = this.findTask(id)
    const hasOriginTask = originTask !== undefined

    if (hasOriginTask && originTask) {

      if (newTask.title !== undefined) {
        originTask.title = newTask.title
      }
    }

    return hasOriginTask
  }

  findTask(id: Task['id']) {
    return this.tasks.find(task => task.id === id)
  }

  // TODO: localeStorage (with autoRun)
  hydrate() {
    
  }
}