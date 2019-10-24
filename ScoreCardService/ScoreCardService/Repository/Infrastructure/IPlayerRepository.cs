using ScoreCardService.Models;
using System.Collections.Generic;

namespace ScoreCardService.Repository.Infrastructure
{
    public interface IPlayerRepository
    {
        List<Player> GetAllPlayers();
        List<Player> CreatePlayer(Player player);
        List<Player> UpdatePlayer(Player player);
        List<Player> DeletePlayer(int id);
    }
}
