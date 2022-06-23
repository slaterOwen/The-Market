import pytest
from Models import Messages
from Utils import verifyMessageShape


@pytest.fixture
def message_shape():
    return ({
        'sender': 'Fizzpop',
        'receiver': 'ChrissyB',
        'message': 'Price?',
        'subject': 'Inquiry on Bike'
    })


def test_correct_shape(message_shape):
    EXPECTED = []
    assert verifyMessageShape(message_shape) == EXPECTED


def test_missing_one_field(message_shape: dict):
    INPUT = message_shape
    INPUT.pop('sender')
    EXPECTED = ['sender']
    assert verifyMessageShape(INPUT) == EXPECTED


def test_missing_two_fields(message_shape: dict):
    INPUT = message_shape
    INPUT.pop('sender')
    INPUT.pop('message')
    EXPECTED = ['sender', 'message']
    assert verifyMessageShape(INPUT) == EXPECTED


def test_find_all_messages():
    assert len(Messages().find_all('60ab1600e933a30ddc3ed417')) > 0


def test_find_conversation():
    assert len(Messages().find_conversation(
        '60ab1600e933a30ddc3ed417', 'Inquiry on a bike')) > 0
