package com.digitalbooking.digitalbooking.infrastructure.rent.adapter;

import com.digitalbooking.digitalbooking.domain.rent.dto.RentDTO;
import com.digitalbooking.digitalbooking.domain.rent.entity.Rent;
import com.digitalbooking.digitalbooking.domain.rent.repository.RentRepository;
import com.digitalbooking.digitalbooking.infrastructure.product.adapter.ProductEntity;
import com.digitalbooking.digitalbooking.infrastructure.rent.MapToRent;
import com.digitalbooking.digitalbooking.infrastructure.user.adapter.UserEntity;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public class RentRepositoryImpl implements RentRepository {

    @Autowired
    RepositoryRentMySql repositoryRentMySql;

    @Override
    public Optional<RentDTO> findByIdAndState(Long id) {
        return repositoryRentMySql.findByIdAndStateIn(id, Set.of("CREADO", "ACTUALIZADO")).map(MapToRent::mapToRent);
    }

    @Override
    public void updateRent(Rent rent) {

    }

    @Override
    public void deleteRent(Long id) {

    }

    @Override
    public Long createRent(Rent rent) {
        RentEntity rentEntity = new RentEntity();
        BeanUtils.copyProperties(rent,rentEntity);
        ProductEntity productEntity = new ProductEntity();
        UserEntity userEntity= new UserEntity();
        productEntity.setId(rent.getProduct().getId());
        userEntity.setId(rent.getUser().getId());
        rentEntity.setProductEntity(productEntity);
        rentEntity.setUserEntity(userEntity);
        return repositoryRentMySql.save(rentEntity).getId();
    }

    @Override
    public List<RentDTO> getAll() {
        return null;
    }
}
