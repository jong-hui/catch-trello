import { getNowDateAt } from "@/helpers/utils";
import { makeAutoObservable } from "mobx";
import { TrelloStore } from '@/stores/TrelloStore/TrelloStore'
import { v4 } from "uuid";

export class TaskModel {
  id: Task['id']
  title: Task['title']
  boardId: Task['boardId']
  isDeleted: Task['isDeleted']
  createdAt: Task['createdAt']
  updatedAt: Task['updatedAt']
  trelloStore: TrelloStore

  constructor(
    data: Omit<Task, 'id' | 'isDeleted' | 'createdAt' | 'updatedAt'>,
    trelloStore: TrelloStore
  ) {
    this.id = v4()
    this.title = data.title
    this.boardId = data.boardId
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

  changeBoard(boardId: Task['boardId']) {
    this.boardId = boardId
  }

  get board() {
    return this.trelloStore.boards.find(_board => _board.id === this.boardId)
  }
}