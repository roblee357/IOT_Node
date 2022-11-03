import couchdb
couch = couchdb.Server()
couch = couchdb.Server('http://adminSY8FG9u5o:0QUTqIy0q@localhost:5984/')
# db = couch.create('test') # newly created
db = couch['test'] # existing

for i in range(12):
    doc = {'KS': str(i).zfill(8)}
    db.save(doc)
    print(doc)