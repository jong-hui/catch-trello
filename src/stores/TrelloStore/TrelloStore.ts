import { BoardModel } from "@/models/trello/BoardModel";
import { TaskModel } from "@/models/trello/taskModel";
import { makeAutoObservable } from "mobx";
import { v4 } from 'uuid'

export class TrelloStore {
  boards: BoardModel[] = []
  tasks: TaskModel[] = []

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
    this.tasks.push(
      new TaskModel({
        title,
        boardId
      })
    )
  }

  addBoard({
    title
  }: {
    title: Board['title']
  }) {
    this.boards.push(
      new BoardModel({
        title,
      }, this)
    )
  }

  // TODO: localeStorage (with autoRun)
  hydrate() {
    
  }
}