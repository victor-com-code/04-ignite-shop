import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { useRouter } from "next/router"

export default function Product() {
  const { query } = useRouter()
  
  return(
    <ProductContainer>
      <ImageContainer>
        
      </ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ea a animi! Nobis ea autem reiciendis ipsa a qui, deserunt accusamus repellat placeat, harum dolore assumenda! Animi officiis eius quis?</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}