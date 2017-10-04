from random import randint
import entities

class GameMap(object):
    def __init__(self):
        self.game_map = []
        self.read_map_from_file()
        self.entities = [entities.Hero([0, 0])]
        self.hero = self.entities[0]
        self.generate_enemies()

    def read_map_from_file(self):
        with open("map.txt", "r") as map_file:
            map_file = map_file.read().split("\n")
            for i in range(len(map_file)):
                map_file[i] = map_file[i].split(",")
            self.game_map = map_file

    def is_wall(self, pos_x, pos_y):
        return self.game_map[pos_y][pos_x] == "X"

    def find_entity_at_position(self, pos_x, pos_y):
        for entity in self.entities:
            if entity.pos_x == pos_x and entity.pos_y == pos_y:
                return entity
        return 0

    def move_entity(self, entity, direction):
        pos_x, pos_y = self.get_new_pos_from_direction(entity.pos_x, entity.pos_y, direction)
        if self.find_entity_at_position(pos_x, pos_y):
            self.initiate_fight(entity, self.find_entity_at_position(pos_x, pos_y))
        elif self.is_valid_move(pos_x, pos_y) and not entity.fighting_enemy:
            entity.pos_x = pos_x
            entity.pos_y = pos_y
        if entity == self.hero:
            entity.change_model(direction)

    def get_new_pos_from_direction(self, pos_x, pos_y, direction):
        if direction == "up":
            pos_y -= 1
        elif direction == "down":
            pos_y += 1
        elif direction == "left":
            pos_x -= 1
        elif direction == "right":
            pos_x += 1  
        return pos_x, pos_y

    def is_valid_move(self, pos_x, pos_y):
        return (pos_x >= 0 and pos_x < 10 and
                pos_y >= 0 and pos_y < 10 and
                not self.is_wall(pos_x, pos_y))

    def move_enemies(self):
        for enemy in self.entities[1:]:
            self.move_entity(enemy, enemy.get_move_direction())

    def generate_enemies(self):
        for i in range(3):
            self.entities.append(entities.Skeleton(self.get_random_tile()))
        self.entities.append(entities.Boss(self.get_random_tile()))

    def initiate_fight(self, attacker, defender):
        if not attacker.evil == defender.evil and not defender.fighting_enemy:
            attacker.fighting_enemy = defender
            attacker.can_strike = True
            defender.fighting_enemy = attacker

    def enemy_strike(self):
        for enemy in self.entities[1:]:
            if enemy.can_strike:
                enemy.strike()

    def get_random_tile(self):
        pos_x = randint(0, 9)
        pos_y = randint(0, 9)
        while self.is_wall(pos_x, pos_y):
            pos_x = randint(0, 9)
            pos_y = randint(0, 9)
        return [pos_x, pos_y]
