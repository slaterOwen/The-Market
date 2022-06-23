import pytest
import App
from Models import User





def test_login():
    expectedUserName = 'Test Test'
    user = User().getUserByEmailPass("test@test.com", "1234")
    assert user is None

def test_reload_fail():
    expected = False
    assert User().reload() == expected
    
def test_remove():
    expected = False
    user = User({'name': 'Bob'})
    user.save()
    User({'_id': user['_id']}).remove()
    assert User({'_id': user['_id']}).reload() == expected
    
def test_save_existing():
    user = User({'_id': "60b6779f2024384d557b0877", 'username': 'BillyBob'})
    user.save()
    assert user['username'] == 'BillyBob'
