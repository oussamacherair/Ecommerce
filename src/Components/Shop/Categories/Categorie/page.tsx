
import type { BaseCategory } from '../../../../types/types'
import "./category.css"
const Categorie = ({ categorie }: { categorie: BaseCategory }) => {
  return (
    <div className='cat-container'>
      
      <div className="cat-name">{categorie.name}</div>
      
    </div>
  )
}

export default Categorie