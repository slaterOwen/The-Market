import pytest
from Models import Transaction
from Utils import verifyTransacationShape


@pytest.fixture
def transaction_shape():
    return ({
        'listingId': '60a60cd68a8ff2fd079ce12e',
        'buyer': '60ab1a523a6e9abeb4be21bf',
        'card': '1234123412341234?',
        'street': '2312 Glen Kerry Ct SE',
        'city': "Olympia",
        'state': "Washington"
    })


def test_correct_shape(transaction_shape):
    EXPECTED = []
    assert verifyTransacationShape(transaction_shape) == EXPECTED


def test_missing_one_field(transaction_shape: dict):
    INPUT = transaction_shape
    INPUT.pop('buyer')
    EXPECTED = ['buyer']
    assert verifyTransacationShape(INPUT) == EXPECTED


def test_find_all_transactions():
    assert len(Transaction().find_all()) > 0
