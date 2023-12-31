package com.digitalbooking.digitalbooking.service;

import com.digitalbooking.digitalbooking.DigitalConfigurationTest;
import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.domain.mail.MailRepository;
import com.digitalbooking.digitalbooking.domain.rent.dto.RentDTO;
import com.digitalbooking.digitalbooking.domain.role.dto.RoleDTO;
import com.digitalbooking.digitalbooking.domain.role.repository.RoleRepository;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.entity.User;
import com.digitalbooking.digitalbooking.domain.user.repository.RepositoryUser;
import com.digitalbooking.digitalbooking.domain.user.service.ServiceUser;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ContextConfiguration(classes = {DigitalConfigurationTest.class}, loader = AnnotationConfigContextLoader.class)
@ExtendWith(SpringExtension.class)
@TestPropertySource(properties = {"email.urlvalidation=http://127.0.0.1:5173/user/activate?token=%s"})
class ServiceUserTest {

    @Autowired
    private RepositoryUser repositoryUser;

    @Autowired
    private MailRepository mailRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ServiceUser serviceUser;

    @Test
    void testCreateUserSuccess() throws Exception {
        RoleDTO role = new RoleDTO();
        role.setId(19L);
        User user =  User.create( "Lore", "Sanchez", "test@test.com", "123");

        when(roleRepository.findByIdAndIsDelete(anyLong())).thenReturn(Optional.of(role));
        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.empty());
        when(repositoryUser.save(any(User.class), anyString(), any(LocalDateTime.class))).thenReturn(1L);

        Long userId = serviceUser.createUser(user);

        assertNotNull(userId);
        verify(roleRepository, times(1)).findByIdAndIsDelete(anyLong());
        verify(repositoryUser, times(1)).save(any(), anyString(), any(LocalDateTime.class));
    }

    @Test
    void testGetUserSuccess() {
        Long userId = 1L;
        UserDTO expectedUser = new UserDTO();
        expectedUser.setName("Lore");

        when(repositoryUser.findById(userId)).thenReturn(expectedUser);

        UserDTO result = serviceUser.getUser(userId);

        assertEquals(expectedUser, result);
        verify(repositoryUser, times(1)).findById(userId);
    }

    @Test
    void testGetUserByEmailSuccess() {
        String email = "test@example.com";
        UserDTO expectedUser = new UserDTO();
        expectedUser.setName("Lore");

        when(repositoryUser.findByEmail(email)).thenReturn(Optional.of(expectedUser));

        UserDTO result = serviceUser.getUser(email);

        assertEquals(expectedUser, result);
    }

    @Test
    void testGetUserByEmailNotFound() {
        String email = "nonexistent@example.com";

        when(repositoryUser.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(ExceptionInvalidValue.class, () -> {
            serviceUser.getUser(email);
        });

        verify(repositoryUser, times(1)).findByEmail(email);
    }


    @Test
    void testGetUsersSuccess() {
        List<UserDTO> expectedUsers = new ArrayList<>();
        expectedUsers.add(new UserDTO());
        expectedUsers.add(new UserDTO());

        when(repositoryUser.getAll()).thenReturn(expectedUsers);

        List<UserDTO> result = serviceUser.getUsers();

        assertEquals(expectedUsers, result);
        verify(repositoryUser, times(1)).getAll();
    }

    @Test
    void testValidateUserSuccess() {
        String token = "testToken";
        LocalDateTime currentDate = LocalDateTime.now();
        List<Long> favorites = new ArrayList<>();
        RoleDTO roleDTO = new RoleDTO();

        UserDTO user = new UserDTO(1L, "Lore", "Sanchez", "lorena@l.com", token, currentDate, false, token,token, "#525252", favorites, roleDTO);

        when(repositoryUser.findByToken(token)).thenReturn(Optional.of(user));

        serviceUser.validateUser(token);

        verify(repositoryUser, times(1)).activateUser(user.getId());
        verify(mailRepository, times(1)).sendEmailAccountActivate(
                anyString(),
                anyString(),
                anyString(),
                anyString()
        );
    }

    @Test
    void testValidateUserExpiredToken() {
        String token = "expiredToken";
        LocalDateTime currentDate = LocalDateTime.now();
        LocalDateTime expirationDate = currentDate.minusHours(48L);
        List<Long> favorites = new ArrayList<>();
        RoleDTO roleDTO = new RoleDTO();

        UserDTO user = new UserDTO(1L, "Lore", "Sanchez", "lorena@l.com", token, expirationDate, false, token,token, "#525252", favorites, roleDTO);

        when(repositoryUser.findByToken(token)).thenReturn(Optional.of(user));

        Exception exception = assertThrows(ExceptionInvalidValue.class, () -> {
            serviceUser.validateUser(token);
        });

        assertEquals("Se superaron las 48 horas, el token ha expirado, debes registrarte nuevamente", exception.getMessage());
        verify(repositoryUser, times(1)).deleteUserByTokenExp(user.getId());
    }

    @Test
    void testValidateUserAlreadyActivated() {
        String token = "activatedToken";
        LocalDateTime currentDate = LocalDateTime.now();
        LocalDateTime expirationDate = currentDate.plusHours(48L);
        List<Long> favorites = new ArrayList<>();
        RoleDTO roleDTO = new RoleDTO();

        UserDTO user = new UserDTO(1L, "Lore", "Sanchez", "lorena@l.com", token, expirationDate, true, token,token,  "#525252", favorites, roleDTO);

        when(repositoryUser.findByToken(token)).thenReturn(Optional.of(user));

        Exception exception = assertThrows(ExceptionInvalidValue.class, () -> serviceUser.validateUser(token));

        assertEquals("Su cuenta ya ha sido activada", exception.getMessage());
    }

    @Test
    void testCreateUser() throws Exception {
        Long id = 0L;
        String name = "John";
        String lastName = "Doe";
        String email = "john.doe@example.com";
        String password = "password";

        User user = User.create(name, lastName, email, password);

        assertNotNull(user);
        assertEquals(id, user.getId());
        assertEquals(name, user.getName());
        assertEquals(lastName, user.getLastName());
        assertEquals(email, user.getEmail());
        assertEquals(password, user.getPassword());
        assertFalse(user.getIsActive());
        assertNotNull(user.getRole());
    }

    @Test
    void testCreateUserWithInvalidEmailFormat() {
        String name = "John";
        String lastName = "Doe";
        String email = "invalid-email";
        String password = "password";

        assertThrows(Exception.class, () -> {
            User.create(name, lastName, email, password);
        });
    }

    @Test
    void testCreateUserWithMissingName() {
        String name = "";
        String lastName = "Doe";
        String email = "john.doe@example.com";
        String password = "password";

        assertThrows(Exception.class, () -> {
            User.create(name, lastName, email, password);
        });
    }

    @Test
    void testCreateUserWithMissingLastName() {
        String name = "John";
        String lastName = "";
        String email = "john.doe@example.com";
        String password = "password";

        assertThrows(Exception.class, () -> {
            User.create(name, lastName, email, password);
        });
    }

    @Test
    void testLoadUserByUsername_UserIsActive() {
        UserDTO user = new UserDTO();
        user.setIsActive(true);

        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.of(user));

        UserDetails userDetails = serviceUser.loadUserByUsername("test@example.com");

        assertNotNull(userDetails);
    }

    @Test
    void testLoadUserByUsername_UserIsNotActive() {
        UserDTO user = new UserDTO();
        user.setIsActive(false);

        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.of(user));

        assertThrows(UsernameNotFoundException.class, () -> serviceUser.loadUserByUsername("test@example.com"));
    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.empty());

        assertThrows(ExceptionInvalidValue.class, () -> serviceUser.loadUserByUsername("test@example.com"));
    }

    @Test
    void testSendEmail_UserExists() {
        UserDTO user = new UserDTO();
        user.setEmail("test@example.com");
        user.setName("Test User");
        user.setToken("random-token");

        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.of(user));

        assertDoesNotThrow(() -> serviceUser.sendEmail("test@example.com"));

        verify(mailRepository, times(1)).sendEmailValidateAccount(anyString(), anyString(), anyString(), anyString());
    }

    @Test
    void testSendEmail_UserNotFound() {
        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.empty());

        assertThrows(ExceptionInvalidValue.class, () -> serviceUser.sendEmail("test@example.com"));
    }
}
