import pytest
from Utils import verifyListingShape


@pytest.fixture
def listing_shape():
    return ({
        'title': 'test',
        'price': 100.29,
        'description': 'lorem ipsum this is a test',
        'lngLat': [-120.45, 35.38],
        'imgUrl': 'testingtest.com'
    })


def test_correct_shape(listing_shape):
    EXPECTED = []
    assert verifyListingShape(listing_shape) == []


def test_missing_one_field(listing_shape: dict):
    INPUT = listing_shape
    INPUT.pop('title')
    EXPECTED = ['title']
    assert verifyListingShape(INPUT) == EXPECTED


def test_missing_two_fields(listing_shape: dict):
    INPUT = listing_shape
    INPUT.pop('title')
    INPUT.pop('price')
    EXPECTED = ['title', 'price']
    assert verifyListingShape(INPUT) == EXPECTED
