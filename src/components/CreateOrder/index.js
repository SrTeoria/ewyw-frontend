import Button from "../Button/index";
import React, { useState } from "react";
import Select from "../SelectInputs";
import Food from "../Food";

export default function CreateOrder({ foods }) {
  const [createOrder, setCreateOrder] = useState(false);
  const [selectFood, setSelectFood] = useState("");
  const [products, setProducts] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice =
    !!products &&
    products.length > 0 &&
    products
      .map(
        (product) =>
          product.selectedType &&
          product.types.find((el) => el.foodLabel === product.selectedType)
            .foodPrice * product.quantity
      )
      .reduce(reducer);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = {
            products,
          };
          console.log(data.products);
        }}
      >
        <Button type="button" handleClick={() => setCreateOrder(!createOrder)}>
          Crear pedido
        </Button>
        <div>
          {createOrder === true && (
            <>
              <Select
                id="selectFood"
                label="Seleccionar tipo de alimento"
                type="foodName"
                onChange={(e) => {
                  setSelectCategory(e.target.value);
                  setSelectFood(null);
                }}
                options={[
                  { _id: "Proteina", foodName: "Proteina" },
                  { _id: "Carbohidrato", foodName: "Carbohidrato" },
                  { _id: "Vegetales", foodName: "Vegetales" },
                  { _id: "Bebidas", foodName: "Bebidas" },
                ]}
              />
              <label>
                Seleccione alimento
                <select onChange={(e) => setSelectFood(e.target.value)}>
                  <option value="">Seleccione alimento</option>
                  {foods
                    .filter(
                      ({ foodCategory }) => foodCategory === selectCategory
                    )
                    .map(({ foodName }) => (
                      <option key={foodName} value={foodName}>
                        {foodName}
                      </option>
                    ))}
                </select>
              </label>

              <Button
                type="button"
                handleClick={() =>
                  setProducts((products) => {
                    const product = foods.find(
                      ({ foodName }) => foodName === selectFood
                    );
                    return [
                      ...products,
                      { ...product, quantity: 1, id: new Date().getTime() },
                    ];
                  })
                }
                disabled={!selectFood}
              >
                Añadir alimento
              </Button>
              {products.map((data, index) => (
                <Food
                  key={index}
                  data={data}
                  onDelete={(productIdToDelete) => {
                    setProducts((products) =>
                      products.filter(({ id }) => id !== productIdToDelete)
                    );
                  }}
                  onUpdate={(field, value) => {
                    setProducts((products) => {
                      const newProducts = products.map((product) => {
                        const newProduct = { ...product };

                        if (newProduct.id === data.id) {
                          newProduct[field] = value;
                        }

                        return newProduct;
                      });

                      return newProducts;
                    });
                  }}
                />
              ))}
              <div>Costo total:{totalPrice ? totalPrice : 0}</div>
              <Button type="submit">Enviar pedido</Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
