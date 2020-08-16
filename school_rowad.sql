-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  lun. 17 août 2020 à 01:02
-- Version du serveur :  10.1.36-MariaDB
-- Version de PHP :  7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `school_rowad`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `firstname` varchar(255) COLLATE utf8_bin NOT NULL,
  `father` varchar(255) COLLATE utf8_bin NOT NULL,
  `grandfather` varchar(255) COLLATE utf8_bin NOT NULL,
  `family` varchar(255) COLLATE utf8_bin NOT NULL,
  `id_number` varchar(255) COLLATE utf8_bin NOT NULL,
  `stage` int(255) NOT NULL,
  `phone` varchar(255) COLLATE utf8_bin NOT NULL,
  `residence` varchar(255) COLLATE utf8_bin NOT NULL,
  `family_certificate` varchar(255) COLLATE utf8_bin NOT NULL,
  `time` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `gender`, `firstname`, `father`, `grandfather`, `family`, `id_number`, `stage`, `phone`, `residence`, `family_certificate`, `time`) VALUES
(1, 0, 'kjh', 'jkhkjhkjh', 'kjhkjhkjh', 'kjhkjhkjh', '2313123213', 0, '', '', '', '1597590097'),
(2, 0, 'Farouk', 'jhdasjkhd', 'iouioudas', 'kljdlaksjdkl', '76783621873', 0, '', '', '', '1597590976'),
(3, 0, 'faruk', 'dasdsa', 'm,nm,n', 'm,nm,n', '3123123432', 0, '', '', '', '1597591032'),
(4, 0, 'Farouk', 'dsadas', 'kljkljlk', 'lkjkljkljkl', '897983712983', 0, '78678687687', '', '', '1597591251'),
(6, 0, 'Farouk', 'dDDDD', 'EEEEE', 'RRRRR', '213121111', 0, '2131211111', 'assets/files/6/72216652265922_2607968199229875_412573012265533440_n.jpg', 'assets/files/6/612838mountain.jpg', '1597597384');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
