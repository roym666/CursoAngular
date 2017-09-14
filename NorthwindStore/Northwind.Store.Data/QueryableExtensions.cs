using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Linq.Extensions
{
    /// <summary>
    /// http://stackoverflow.com/questions/36298868/how-to-dynamically-order-by-certain-entity-properties-in-entityframework-7-core
    /// http://stackoverflow.com/users/5202563/ivan-stoev	
    /// </summary>
    public static class QueryableExtensions
    {
        public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, IEnumerable<SortModel> sortModels)
        {
            var expression = source.Expression;
            int count = 0;
            foreach (var item in sortModels)
            {
                var parameter = Expression.Parameter(typeof(T), "x");
                var selector = Expression.PropertyOrField(parameter, item.ColumnName);
                var method = string.Equals(item.Sort, "desc", StringComparison.OrdinalIgnoreCase) ?
                    (count == 0 ? "OrderByDescending" : "ThenByDescending") :
                    (count == 0 ? "OrderBy" : "ThenBy");
                expression = Expression.Call(typeof(Queryable), method,
                    new Type[] { source.ElementType, selector.Type },
                    expression, Expression.Quote(Expression.Lambda(selector, parameter)));
                count++;
            }
            return count > 0 ? source.Provider.CreateQuery<T>(expression) : source;
        }
    }

    public class SortModel
    {
        public string ColumnName { get; set; }
        public string Sort { get; set; }
    }
}
