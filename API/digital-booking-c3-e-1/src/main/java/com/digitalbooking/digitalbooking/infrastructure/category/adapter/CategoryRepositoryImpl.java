package com.digitalbooking.digitalbooking.infrastructure.category.adapter;

import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.entity.Category;
import com.digitalbooking.digitalbooking.domain.category.repository.CategoryRepository;
import com.digitalbooking.digitalbooking.infrastructure.category.MapToCategory;
import com.digitalbooking.digitalbooking.infrastructure.product.adapter.ProductS3;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class CategoryRepositoryImpl implements CategoryRepository {
    @Autowired
    ProductS3 productS3;
    @Autowired
    CategoryRepositoryMySql categoryRepositoryMySql;

    @Override
    public Long save(Category category, String imageURL) {
        CategoryEntity categoryEntity = new CategoryEntity();
        BeanUtils.copyProperties(category, categoryEntity);
        categoryEntity.setImageURL(imageURL);

        return categoryRepositoryMySql.save(categoryEntity).getId();
    }

    @Override
    public String saveImage(String fileName, String image) {
        return productS3.saveImage(fileName, image);
    }

    @Override
    public Optional<Category> findById(Long id) {
        Optional<CategoryEntity> category = categoryRepositoryMySql.findById(id);
        return category.map(c -> Category.reBuild(c.getId(), c.getName(), c.getImageURL(), c.getDescription(), c.getFileName()));
    }

    @Override
    public List<CategoryDTO> getAll() {
        return categoryRepositoryMySql.findAll().stream().map(MapToCategory::mapToCategory).collect(Collectors.toList());
    }
}
