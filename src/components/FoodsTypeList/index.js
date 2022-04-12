import "./styles.css"
export function FoodsTypesList({ types = [] }) {
  return(
    <div>
      {
        types.map(({foodLabel, foodPrice, _id}) => {
          return(
            <div className='typesRender' key={_id}>
              <span>
                <strong>Tipo:</strong>{foodLabel}
              </span>
              <br />
              <span>
                <strong>Precio:</strong>{foodPrice}
              </span>
              <br />
            </div>
          )
        })
      }
    </div>
  )
}
