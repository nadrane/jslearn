/**************************************************************
  Movie ratings
**************************************************************/
/**************************************************************
  Find the titles of all movies directed by Steven Spielberg
**************************************************************/

Select title
from Movie
where director = 'Steven Spielberg';

/**************************************************************
  Find all years that have a movie that received a rating of 4 or 5, and sort them in increasing order. 
**************************************************************/

select distinct year
from Movie
where mID in (select mID from Rating where stars >=4)
order by year;

/**************************************************************
  Find the titles of all movies that have no ratings.  
**************************************************************/

select title
from Movie
where mID not in (select mID from Rating where stars is not null);

/**************************************************************
  Some reviewers didn't provide a date with their rating. Find the names of all reviewers who have ratings with a NULL value for the date. 
**************************************************************/

select Reviewer.name
from Rating, Reviewer
where Rating.rID = Reviewer.rID and ratingDate is null;

/**************************************************************
  Write a query to return the ratings data in a more readable format: reviewer name, movie title, stars, and ratingDate. 
  Also, sort the data, first by reviewer name, then by movie title, and lastly by number of stars. 
**************************************************************/

select Reviewer.name, Movie.title, Rating.stars, Rating.ratingDate
from Rating, Reviewer, Movie
where Rating.rID = Reviewer.rID and Rating.mID = Movie.mID
order by Reviewer.name, Movie.title, Rating.stars;

/**************************************************************
  For all cases where the same reviewer rated the same movie twice and gave it a higher rating the second time, 
  return the reviewer's name and the title of the movie. 
**************************************************************/

select Reviewer.name, Movie.title
from Rating R1, Rating R2 join Reviewer on R1.rID = Reviewer.rID join Movie on R1.mID = Movie.mID
where R1.rID = R2.rID and R1.mID = R2.mID
and R1.ratingDate > R2.ratingDate and R1.stars > R2.stars;

/* alternative */
select Rev.name, Mov.title
from Rating Rat1, Reviewer Rev, Movie Mov
where Rat1.rID = Rev.rID and Rat1.mID = Mov.mID
and exists (select * from Rating Rat2
where Rat1.rID = Rat2.rID and Rat1.mID = Rat2.mID 
and Rat1.ratingDate > Rat2.ratingDate and Rat1.stars > Rat2.stars);

/**************************************************************
  For each movie that has at least one rating, find the highest number of stars that movie received. 
  Return the movie title and number of stars. Sort by movie title.
**************************************************************/

select distinct Movie.title, R1.stars
from Rating R1 join Movie on R1.mID = Movie.mID
where not exists (select * from Rating R2 where R1.mID = R2.mID and R2.stars > R1.stars)
order by Movie.title;

/**************************************************************
  For each movie, return the title and the 'rating spread', that is, 
  the difference between highest and lowest ratings given to that movie. 
  Sort by rating spread from highest to lowest, then by movie title.  
**************************************************************/

select title, Max(stars) - Min(stars) as spread
from Rating, Movie
where Rating.mID = Movie.mID
group by title
order by spread desc, title;

/**************************************************************
  Find the difference between the average rating of movies released before 1980 
  and the average rating of movies released after 1980. (Make sure to calculate the average 
  rating for each movie, then the average of those averages for movies before 1980 and movies after. 
  Don't just calculate the overall average rating before and after 1980.) 
**************************************************************/

select Max(final) - Min(final) 
from (select 'combine' as combine, avg(ascore) as final
      from (select avg(stars) as ascore, (year < 1980) as pre 
            from Rating join Movie on Rating.mID = Movie.mID
            group by Rating.mID) M
      group by pre) G
group by combine;

/* alternative */
select (select avg(ascore)
        from (select Rating.mID, year, avg(stars) as ascore
              from Rating join Movie on Rating.mID = Movie.mID
              group by Rating.mID) G
        where year < 1980)
      - (select avg(ascore)
        from (select Rating.mID, year, avg(stars) as ascore
              from Rating join Movie on Rating.mID = Movie.mID
              group by Rating.mID) G
        where year >= 1980);



/**************************************************************
  Social Media
**************************************************************/
/**************************************************************
  Find the names of all students who are friends with someone named Gabriel. 
**************************************************************/

select Highschooler.name
from Friend join Highschooler on Friend.ID1 = Highschooler.ID
where ID2 in (select ID from Highschooler where name = "Gabriel");

/**************************************************************
  For every student who likes someone 2 or more grades younger than themselves, 
  return that student's name and grade, and the name and grade of the student they like. 
**************************************************************/

select H1.name, H1.grade, H2.name, H2.grade
from Likes, Highschooler H1, Highschooler H2
where Likes.ID1 = H1.ID and Likes.ID2 = H2.ID
and H1.grade - H2.grade >= 2;

/**************************************************************
  For every pair of students who both like each other, return the name and grade of both students. 
  Include each pair only once, with the two names in alphabetical order. 
**************************************************************/

select H1.name, H1.grade, H2.name, H2.grade
from Likes L1 join Highschooler H1 on L1.ID1 = H1.ID 
join Highschooler H2 on L1.ID2 = H2.ID
where H1.name < H2.name and
exists (select * from Likes L2 where L1.id1 = L2.id2 and L1.id2 = L2.id1);

/**************************************************************
  Find all students who do not appear in the Likes table (as a student who likes or is liked) 
  and return their names and grades. Sort by grade, then by name within each grade. 
**************************************************************/

select name, grade
from Highschooler
where ID not in (select ID1 as id from Likes union select ID2 as id from Likes)
order by grade, name;

/**************************************************************
  For every situation where student A likes student B, but we have no information about whom B likes 
  (that is, B does not appear as an ID1 in the Likes table), return A and B's names and grades. 
**************************************************************/

select H1.name, H1.grade, H2.name, H2.grade
from Likes L1 join Highschooler H1 on L1.ID1 = H1.ID 
join Highschooler H2 on L1.ID2 = H2.ID
where L1.ID2 not in (select L2.ID1 from Likes L2);

/**************************************************************
  Find names and grades of students who only have friends in the same grade. 
  Return the result sorted by grade, then by name within each grade. 
**************************************************************/

select distinct H1.name, H1.grade
from Friend F1 join Highschooler H1 on F1.ID1 = H1.ID
where not exists 
(select * 
from Friend F2 join Highschooler H2 on F2.ID2 = H2.ID
where F2.ID1 = F1.ID1 
and H2.grade <> H1.grade)
order by H1.grade, H1.name;

