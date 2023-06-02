package com.digitalbooking.digitalbooking.domain.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private Long id;
    private String name;
    private String brand;
    private String state;
    private BigDecimal price;
    private String description;
    private String size;
    private String gender;
    private BigDecimal deposit;
    private String category;
    private String imageURL;
    private String color;
    private String material;
<<<<<<< HEAD
    private List<ImageProductDTO> secondaryImages;
=======
>>>>>>> c745d2fd0d4da77d38337c252e93018b79633e50

    /*public Product parseToProduct(){
        return Product.reconstruir()
    }*/

}

