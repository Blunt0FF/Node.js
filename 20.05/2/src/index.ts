class anyRepo<T extends {id:number, name: string}>{
  private items:T[] = []
  add(item:T):void{
    this.items.push(item)
  }
  getById(id: number):T | undefined{
    return this.items.find(i => i.id === id)
  }
}
const repo = new anyRepo()
repo.add({id: 1, name: "Tati"})
const result = repo.getById(1)
console.log(result?.name)

console.log(repo)