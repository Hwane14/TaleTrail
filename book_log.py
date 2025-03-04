from datetime import datetime

class BookLog:
    def __init__(self, book, pagesRead=0, totalPagesRead=0, dateAdded=None, completed=False):
        self.id = id
        self.book = book
        self.pagesRead = pagesRead
        self.totalPagesRead = totalPagesRead
        self.dateAdded = dateAdded if dateAdded else datetime.now()
        self.completed = completed

    def calculateTotalPagesRead(self):
        self.totalPagesRead += self.pagesRead
        return self.totalPagesRead

    def triggerInteraction(self):
        