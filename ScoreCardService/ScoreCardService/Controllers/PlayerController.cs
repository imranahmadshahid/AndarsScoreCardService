using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScoreCardService.Models;
using ScoreCardService.Repository.Infrastructure;

namespace ScoreCardService.Controllers
{
    
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private IPlayerRepository _playerRepository;
        public PlayerController(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        [HttpGet]
        [Route("api/v1/GetAllPlayers")]
        public IActionResult GetAllPlayers()
        {
            return Ok(_playerRepository.GetAllPlayers());
        }

        [HttpPost]
        [Route("api/v1/CreatePlayer")]
        public IActionResult CreatePlayer(Player player)
        {
            return Ok(_playerRepository.CreatePlayer(player));
        }

        [HttpPost]
        [Route("api/v1/UpdatePlayer")]
        public IActionResult UpdatePlayer(Player player)
        {
            return Ok(_playerRepository.UpdatePlayer(player));

        }

        [HttpGet]
        [Route("api/v1/DeletePlayer/{id}")]
        public IActionResult DeletePlayer(int id)
        {
            return Ok(_playerRepository.DeletePlayer(id));
        }
    }
}