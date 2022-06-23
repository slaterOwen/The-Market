import pytest
import App
from Models import User

def test_verifyUser():
    expectedUserName = "Test Again"
    user = User({'_id': "60b13cc260516d3a3abdeed3"})
    user.reload()
    user = user.verifyUser(user['authId'])
    assert user['username'] == expectedUserName

def test_verifyUser_failure():
    user = User().verifyUser("")
    assert user['message'] == 'unauthorized'

def test_get_User_by_emailpass():
    expectedUserName = "Fizzpop"
    user = User().getUserByEmailPass("chase@test.com", "54fe842cf48f271d8809924a495e9ccf98ac8372170535fe17afcb3bb7f9c16f")
    assert user['username'] == expectedUserName

def test_get_User_by_userpass():
    expectedUserName = "Fizzpop"
    user = User().getUserByUsernamePass("Fizzpop", "54fe842cf48f271d8809924a495e9ccf98ac8372170535fe17afcb3bb7f9c16f")
    assert user['username'] == expectedUserName

def test_add_User():
    user = User()
    user['username'] = "test"
    user['password'] = "aaaaaaaa"
    user.addUser()
    actual = User().getUserByUsernamePass("test", "aaaaaaaa")
    assert actual['username'] == user['username']
    user.remove()
    