import { categories } from "../data/categories"
import { useBodget } from "../hooks/useBodget"

const FilterByCategory = () => {

    const { dispatch } = useBodget()

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'Add-Filter-Category', payload: {id: e.target.value}})
    }

  return (
    <div className=" bg-white shadow-lg rounded-lg p-10">
        <form action="">
            <div className=" flex flex-col md:flex-row md:items-center gap-5">
                <label htmlFor="category">Filtar Gastos</label>
                <select 
                    id="category"
                    className=" bg-slate-100 p-3 flex-1 rounded"
                    onChange={handleChange}
                >
                    <option value="">--Todas las Categorias</option>
                    {categories.map(category => (
                        <option 
                        value={category.id}
                        key={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    </div>
  )
}

export default FilterByCategory
