# from api.App import app
# from flask import Flask, request, jsonify

# Unless code base gets too large, shouldnt need to split up routes amound different files

# listings = [
#     {
#         title: "Bicycle",
#         price: 100.29,
#         desc:
#         "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
#         lngLat: [-120.45, 35.38],
#         imgUrl:
#         "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
#         id: "asdbcs",
#     },
# ]


# @app.route('/items')
# def get_items():
#     if request.method == 'GET':
#         return jsonify({"listings": listings}), 200


# @app.route('/items/<id>')
# def get_item():
#     if request.method == 'GET':
#         item = None
#         for itm in listings:
#             if itm.id == id:
#                 item = itm
#         if item == None:
#             return jsonify({"error": "Item not found"}), 404
#         return jsonify(item), 200
