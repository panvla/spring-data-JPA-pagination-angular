package com.vladimirpandurov.springdataJPApaginationangular.service.implementation;

import com.vladimirpandurov.springdataJPApaginationangular.domain.User;
import com.vladimirpandurov.springdataJPApaginationangular.repository.UserRepository;
import com.vladimirpandurov.springdataJPApaginationangular.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;


    @Override
    public Page<User> getUsers(String name, int page, int size) {
        log.info("Fetching users for page {} of size {}", page, size);
        return userRepository.findByNameContaining(name, PageRequest.of(page, size));
    }
}
