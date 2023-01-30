package com.vladimirpandurov.springdataJPApaginationangular.service;

import com.vladimirpandurov.springdataJPApaginationangular.domain.User;
import org.springframework.data.domain.Page;

public interface UserService {
    Page<User> getUsers(String name, int page, int size);
}
