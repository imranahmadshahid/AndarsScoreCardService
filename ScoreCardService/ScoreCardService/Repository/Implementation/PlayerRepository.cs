using ScoreCardService.Models;
using ScoreCardService.Repository.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScoreCardService.Repository.Implementation
{
    public class PlayerRepository : IPlayerRepository
    {
        private static List<Player> _playerDataSource;

        static PlayerRepository()
        {
            _playerDataSource = new List<Player>();
            LoadInitialData();
        }

        private static void LoadInitialData()
        {
            _playerDataSource.Add(new Player() { Id = 1, Name = "Imran", Score = 10 });
            _playerDataSource.Add(new Player() { Id = 2, Name = "Adnan", Score = 12 });
            _playerDataSource.Add(new Player() { Id = 3, Name = "John", Score = 14});
            _playerDataSource.Add(new Player() { Id = 4, Name = "Sara", Score = 15 });
        }
        public List<Player> CreatePlayer(Player player)
        {
            var id = _playerDataSource.Any()? _playerDataSource.Max(x=>x.Id) + 1 : 1;
            player.Id = id;
            _playerDataSource.Add(player);
            return GetAllPlayers();
        }

        public List<Player> DeletePlayer(int id)
        {
            var player = _playerDataSource.FirstOrDefault(x => x.Id == id);
            if(player!=null)
            {
                _playerDataSource.Remove(player);
            }
            return GetAllPlayers();
        }

        public List<Player> GetAllPlayers()
        {
            return _playerDataSource.OrderBy(x => x.Score).ToList(); 
        }

        public List<Player> UpdatePlayer(Player p)
        {
            var player = _playerDataSource.FirstOrDefault(x => x.Id == p.Id);
            if (player != null)
            {
                player.Name = p.Name;
                player.Score = p.Score;
            }
            return GetAllPlayers();
        }
    }
}
