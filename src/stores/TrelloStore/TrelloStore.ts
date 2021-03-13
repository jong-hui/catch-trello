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
      const aBoard = this.addBoard({ title: 'A' })
      const bBoard = this.addBoard({ title: 'B' })
      const cBoard = this.addBoard({ title: 'C' })
      const dBoard = this.addBoard({ title: 'D' })

      // aBoard
      this.addTask({
        title: 'Item 1',
        boardId: aBoard.id
      })
      this.addTask({
        title: 'Item 2',
        boardId: aBoard.id
      })
      this.addTask({
        title: 'Item 3',
        boardId: aBoard.id
      })
      this.addTask({
        title: 'Item 4',
        boardId: aBoard.id
      })

      // bBoard
      this.addTask({
        title: 'Item 1',
        boardId: bBoard.id
      })
      this.addTask({
        title: 'Item 2',
        boardId: bBoard.id
      })

      // cBoard
      this.addTask({
        title: 'Item 1',
        boardId: cBoard.id
      })
      this.addTask({
        title: 'Item 2',
        boardId: cBoard.id
      })
      this.addTask({
        title: 'Item 3',
        boardId: cBoard.id
      })

      // dBoard
      this.addTask({
        title: 'Item 1',
        boardId: dBoard.id
      })
    }
  }

  addTask({
    title,
    boardId
  }: {
    title: Task['title']
    boardId: Task['boardId']
  }) {
    const newTask = new TaskModel({
      title,
      boardId
    }, this)

    this.tasks.push(newTask)

    return newTask
  }

  addBoard({
    title
  }: {
    title: Board['title']
  }) {
    const newBoard = new BoardModel({
      title,
    }, this)

    this.boards.push(newBoard)

    return newBoard
  }

  getBoardByIndex(index: number) {
    return this.boards[index]
  }
  
  get hydrateKey() {
    return `trelloStore-hydrate-${this.id}`
  }

  get displayBoards() {
    return this.boards
      .filter(board => !board.isDeleted)
      .sort((a, b) => {
        return +new Date(a.updatedAt) > +new Date(b.updatedAt) ? 1 : -1
      })
  }

  get displayTasks() {
    return this.tasks
      .filter(task => !task.isDeleted)
      .sort((a, b) => {
        return +new Date(a.updatedAt) > +new Date(b.updatedAt) ? 1 : -1
      })
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