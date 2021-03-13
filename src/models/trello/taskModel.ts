import { getNowDateAt } from "@/helpers/utils";
import { makeAutoObservable } from "mobx";
import { v4 } from "uuid";

export class TaskModel {
  id: Task['id']
  title: Task['title']
  boardId: Task['boardId']
  isDeleted: Task['isDeleted']
  createdAt: Task['createdAt']
  updatedAt: Task['updatedAt']

  constructor(data: Omit<Task, 'id' | 'isDeleted' | 'createdAt' | 'updatedAt'>) {
    this.id = v4()
    this.title = data.title
    this.boardId = data.boardId
    this.isDeleted = false
    this.createdAt = getNowDateAt()
    this.updatedAt = getNowDateAt()

    makeAutoObservable(this)
  }

  delete() {
    this.isDeleted = true
  }

  changeTitle(title: string) {
    this.title = title
  }

  changeBoard(boardId: Task['boardId']) {
    this.boardId = boardId
  }

}