import { isServer } from "@/helpers/utils";
import { BoardModel } from "@/models/trello/BoardModel";
import { TaskModel } from "@/models/trello/TaskModel";
import { autorun, makeAutoObservable, toJS } from "mobx";

export class TrelloStore {
  id: string
  boards: BoardModel[] = []
  tasks: TaskModel[] = []

  constructor(id: string) {
    this.id = id
    this.hydrate()

    makeAutoObservable(this)

    this.initial()

    const setTrelloId = (data: any) => {
      data.trelloStore = this.id

      return data
    }

    if (!isServer()) {
      autorun(() => {
        const boards = toJS(this.boards).map(setTrelloId)
        const tasks = toJS(this.tasks).map(setTrelloId)

        window.localStorage[this.hydrateKey] = JSON.stringify({
          boards,
          tasks
        })
      })
    }
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
      }, this)
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

  getBoardByIndex(index: number) {
    return this.boards[index]
  }
  
  get hydrateKey() {
    return `trelloStore-hydrate-${this.id}`
  }

  get displayBoard() {
    return this.boards.filter(board => !board.isDeleted)
  }

  get displayTask() {
    return this.tasks.filter(board => !board.isDeleted)
  }

  hydrate() {
    if (
      isServer() ||
      window.localStorage[this.hydrateKey] === undefined
    ) {
      return
    }

    const hydrateData = JSON.parse(window.localStorage[this.hydrateKey])

    if (hydrateData.tasks) {
      this.tasks = hydrateData.tasks.map((task: any) => {
        const newTask = new TaskModel({
          title: task.title,
          boardId: task.boardId
        }, this)

        newTask.hydrate(task)

        return newTask
      })      
    }

    if (hydrateData.boards) {
      this.boards = hydrateData.boards.map((board: any) => {
        const newBoard = new BoardModel({
          title: board.title
        }, this)

        newBoard.hydrate(board)

        return newBoard
      })
    }
  }
}