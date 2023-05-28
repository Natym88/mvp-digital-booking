package com.digitalbooking.digitalbooking.domain.product.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.domain.category.repository.CategoryRepository;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceProduct {

    @Autowired
    RepositoryProduct repositoryProduct;

    @Autowired
    CategoryRepository categoryRepository;

    public Long createProduct(Product product) throws Exception {
        var category = categoryRepository.findById(product.getCategory().getId());
        category.orElseThrow(() -> new ExceptionInvalidValue("category not found"));
        String imageURL = repositoryProduct.saveImage(String.format("%s%s%s",product.getName().trim(),product.getBrand().replace(" ",""),product.getFileName().trim()), product.getImage());
        return repositoryProduct.save(product,imageURL);
    }

    public List<ProductDTO> getProducts(){
        return repositoryProduct.getAll();
    }

    public ProductDTO getProduct(Long id) {
        return repositoryProduct.findById(id);
    }

    public String deleteProduct(Product product){
        repositoryProduct.deleteProduct(product.getId());
        return "Producto eliminado correctamente";
    }
}
