import { getNowDateAt } from "@/helpers/utils";
import { TrelloStore } from "@/stores/TrelloStore/TrelloStore";
import { makeAutoObservable } from "mobx";
import { v4 } from "uuid";

export class BoardModel {
  id: Board['id']
  title: Board['title']
  isDeleted: Board['isDeleted']
  createdAt: Board['createdAt']
  updatedAt: Board['updatedAt']
  trelloStore: TrelloStore

  constructor(
    data: Omit<Board, 'id' | 'isDeleted' | 'createdAt' | 'updatedAt'>,
    trelloStore: TrelloStore
  ) {
    this.id = v4()
    this.title = data.title
    this.isDeleted = false
    this.createdAt = getNowDateAt()
    this.updatedAt = getNowDateAt()
    this.trelloStore = trelloStore

    makeAutoObservable(this)
  }

  delete() {
    this.isDeleted = true
  }

  changeTitle(title: string) {
    this.title = title
  }

  get tasks() {
    return this.trelloStore.tasks.find(task => task.boardId === this.id)
  }
}